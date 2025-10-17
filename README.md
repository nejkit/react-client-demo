# React Client Demo

## 🧪 Development Setup

### Prerequisites
- Node.js v24.3.0
- pnpm 11.4.2

### Install dependencies
```bash
npm install
```

### Start dev

Create .env.local with VITE_API_URL=http://localhost:${serverPort}

```bash
npm dev 
```

### Docker build

```VITE_API_URL``` - Url to Activity Service Api

```bash
docker build . \
 --build-arg VITE_API_URL=activity-service-host \
 -t image-tag 
```

### Dependencies
- [Activity Service](https://github.com/nejkit/user-activity-service)