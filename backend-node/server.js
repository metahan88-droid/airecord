const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Google Gemini Configuration
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Node.js + AI (OpenAI & Google Gemini)',
    providers: {
      openai: !!process.env.OPENAI_API_KEY,
      google: !!process.env.GOOGLE_API_KEY
    }
  });
});

// AI Generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { studentName, subject, recordType, evidence, templateType, provider = 'google' } = req.body;

    // Validate required fields
    if (!studentName || !recordType || !evidence) {
      return res.status(400).json({
        error: 'Missing required fields: studentName, recordType, evidence'
      });
    }

    // Build prompt based on record type
    const prompts = {
      subject: `다음 학생의 교과 세부능력특기사항(세특)을 작성해주세요.

학생: ${studentName}
과목: ${subject || '해당 과목'}
근거 자료:
${evidence}

작성 규칙:
- 200-500자 분량으로 작성
- 구체적인 활동 내용과 성취를 기록
- 학생의 강점과 특징을 객관적으로 서술
- 금칙어 사용 금지 (우수하다, 뛰어나다, 1등 등)
- NEIS 업로드 가능한 형식으로 작성`,

      activity: `다음 학생의 창의적 체험활동 기록을 작성해주세요.

학생: ${studentName}
근거 자료:
${evidence}

작성 규칙:
- 100-300자 분량으로 작성
- 활동의 구체적인 과정과 결과를 기록
- 학생의 참여도와 태도를 객관적으로 서술
- 금칙어 사용 금지`,

      homeroom: `다음 학생의 담임종합의견을 작성해주세요.

학생: ${studentName}
근거 자료:
${evidence}

작성 규칙:
- 300-700자 분량으로 작성
- 학생의 전반적인 학교생활을 종합적으로 기술
- 성장 과정과 변화를 구체적으로 기록
- 긍정적이고 격려하는 톤으로 작성
- 금칙어 사용 금지`,

      career: `다음 학생의 진로활동 기록을 작성해주세요.

학생: ${studentName}
근거 자료:
${evidence}

작성 규칙:
- 200-400자 분량으로 작성
- 진로 탐색 활동과 관심 분야를 구체적으로 기록
- 학생의 진로 계획과 준비 과정을 서술
- 금칙어 사용 금지`
    };

    const prompt = prompts[recordType] || prompts.subject;
    const systemMessage = "당신은 한국의 생활기록부(생기부) 작성 전문가입니다. NEIS 시스템에 업로드 가능한 형식으로 정확하고 객관적인 기록을 작성합니다. 금칙어를 절대 사용하지 않으며, 구체적이고 사실에 기반한 내용을 작성합니다.";

    let generatedText;
    let modelUsed;

    // Choose provider
    if (provider === 'google' && genAI) {
      // Use Google Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const result = await model.generateContent(`${systemMessage}\n\n${prompt}`);
      const response = await result.response;
      generatedText = response.text();
      modelUsed = 'gemini-2.0-flash-exp';
    } else if (provider === 'openai' || !genAI) {
      // Use OpenAI (fallback if Google not available)
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      generatedText = completion.choices[0].message.content;
      modelUsed = 'gpt-4o-mini';
    } else {
      return res.status(503).json({
        error: 'No AI provider available',
        message: 'Please set GOOGLE_API_KEY or OPENAI_API_KEY in .env file'
      });
    }

    // Check for forbidden words
    const forbiddenWords = ['우수하다', '뛰어나다', '1등', '2등', '꼴찌', 'ADHD', 'ADD'];
    const foundForbidden = forbiddenWords.filter(word => generatedText.includes(word));

    res.json({
      success: true,
      generatedText,
      warnings: foundForbidden.length > 0 ? {
        forbiddenWords: foundForbidden,
        message: '금칙어가 발견되었습니다. 수정이 필요합니다.'
      } : null,
      metadata: {
        length: generatedText.replace(/\s/g, '').length,
        model: modelUsed,
        provider: provider === 'google' && genAI ? 'google' : 'openai',
        backend: 'Node.js + Multi-AI'
      }
    });

  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({
      error: 'Failed to generate text',
      message: error.message
    });
  }
});

// Batch generation endpoint
app.post('/api/generate/batch', async (req, res) => {
  try {
    const { students } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: 'Invalid students array' });
    }

    const results = await Promise.all(
      students.map(async (student) => {
        try {
          const prompt = `${student.studentName} 학생의 ${student.recordType} 기록을 작성해주세요.\n근거: ${student.evidence}`;

          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "생활기록부 작성 전문가입니다." },
              { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 800
          });

          return {
            studentName: student.studentName,
            success: true,
            generatedText: completion.choices[0].message.content
          };
        } catch (error) {
          return {
            studentName: student.studentName,
            success: false,
            error: error.message
          };
        }
      })
    );

    res.json({
      success: true,
      results,
      total: students.length,
      successful: results.filter(r => r.success).length
    });

  } catch (error) {
    console.error('Error in batch generation:', error);
    res.status(500).json({ error: 'Batch generation failed', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js + OpenAI backend running on http://localhost:${PORT}`);
  console.log(`📝 Endpoint: POST http://localhost:${PORT}/api/generate`);
});
