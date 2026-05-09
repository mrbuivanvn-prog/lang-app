# Lang App Backend

Chuyên nghiệp backend cho ứng dụng học ngôn ngữ với tích hợp AI local (Qwen 2.5:3B).

## ✨ Tính năng

- 🎬 **YouTube Subtitle Extraction** - Lấy phụ đề từ video YouTube
- 🤖 **AI Translation** - Dịch văn bản sử dụng Qwen 2.5:3B
- 📝 **Content Summarization** - Tóm tắt nội dung
- 🔍 **Text Analysis** - Phân tích ngữ pháp, từ vựng, độ rõ ràng, tâm trạng
- 📊 **Structured Logging** - Log chi tiết với file support
- ⚡ **Error Handling** - Xử lý lỗi toàn cực
- 🔐 **Validation** - Kiểm tra input toàn bộ

## 📋 Yêu cầu

- Node.js >= 14
- Ollama + Qwen 2.5:3B model
- npm hoặc yarn

## 🚀 Cài đặt

### 1. Cài đặt Ollama
```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows - Download từ https://ollama.ai
```

### 2. Pull Qwen 2.5:3B model
```bash
ollama pull qwen2.5:3b
ollama serve
```

### 3. Cài đặt Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## 🔧 Cấu hình

```bash
# .env file
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:3b
```

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

### YouTube Subtitles
```bash
POST /api/v1/subtitle
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "segments": [...],
    "fullText": "...",
    "duration": 125,
    "language": "auto-detected"
  },
  "timestamp": "2026-05-09T..."
}
```

### Translation
```bash
POST /api/v1/ai/translate
Content-Type: application/json

{
  "text": "Hello world",
  "sourceLang": "English",
  "targetLang": "Vietnamese"
}
```

### Summarization
```bash
POST /api/v1/ai/summarize
Content-Type: application/json

{
  "text": "Long text here...",
  "language": "English"
}
```

### Text Analysis
```bash
POST /api/v1/ai/analyze
Content-Type: application/json

{
  "text": "Your text here",
  "type": "grammar", // grammar, vocabulary, clarity, sentiment
  "language": "English"
}
```

## 🏗️ Cấu trúc dự án

```
backend/
├── server.js              # Main entry point
├── package.json
├── .env.example
├── config/
│   └── ollama.js          # Ollama AI client
├── controllers/
│   ├── subtitleController.js
│   └── aiController.js
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
├── utils/
│   ├── logger.js
│   └── apiError.js
├── logs/                  # Log files directory
└── README.md
```

## 📝 Logs

Logs được lưu tại `backend/logs/app-YYYY-MM-DD.log`

## 🧪 Testing

```bash
npm test
```

## 🚢 Production

```bash
NODE_ENV=production npm start
```

## 📄 License

MIT

---

**Build with ❤️ for language learners**
