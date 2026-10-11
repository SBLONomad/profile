# Portfolio Site

개인 포트폴리오 사이트 — Next.js + Tailwind CSS + Decap CMS

## 로컬 개발

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 배포 (Netlify)

`main` 브랜치에 푸시하면 Netlify가 자동으로 빌드·배포합니다. (https://portfolio-dxh.netlify.app)

처음 연결하거나 관리자 페이지(`/admin`)를 쓰려면 아래 **마무리 수동 설정 3단계**가 필요합니다.

### 마무리 수동 설정 3단계

1. **저장소 연결** — Netlify에서 Add new site → Import an existing project → GitHub의 이 저장소를 선택합니다. 빌드 설정은 `netlify.toml`에 들어 있어 따로 입력하지 않아도 됩니다.
2. **Identity 켜기** — Site configuration → Identity → Enable Identity. Registration은 Invite only로 두고, 본인 이메일을 Invite users로 초대합니다.
3. **Git Gateway 켜기** — Identity → Services → Git Gateway → Enable. 초대 메일의 링크로 비밀번호를 만든 뒤 `/admin`에 로그인하면 작업물을 추가·수정할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **CMS**: Decap CMS (GitHub 연동)
- **Hosting**: Netlify

## 프로젝트 추가 방법

1. `https://portfolio-dxh.netlify.app/admin` 접속
2. "New Project" 클릭
3. 제목, 설명, 카테고리, 이미지 업로드
4. Publish → GitHub에 자동 커밋 → 사이트에 자동 반영

문구와 파일을 직접 고치는 방법은 `TEXT_EDIT_GUIDE.md`를 참고하세요.

## 이미지 용량

상세 이미지는 JPG(가로 2000px 이하)로 올리는 것을 권장합니다. 큰 PNG를 그대로 올리면 상세 페이지 로딩이 느려집니다.
