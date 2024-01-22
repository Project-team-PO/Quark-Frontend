
# Quark - Frontend
How to do odpalenia aplikacji - część frontendowa
-
Jak chcecie przy panelu logowania rejestrować użytkownika z własnym mailem to musi być to taki do którego macie dostęp bo będą tam wysyłane dane do logowania.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Project-team-PO/Quark-Frontend.git
```

Install dependencies

```bash
  npm install
```

Build the app

```bash
  npm run build
```

Or just run in development mode

```bash
  npm run dev
```

Run preview (with build)

```bash
  npm run preview
```

## Environment Variables

Do uruchomienia projektu trzeba wrzucić pare zmiennych do pliku .env.local (trzeba go utworzyć) i umieścić go w głównym folderze projektu (obok src).

`VITE_UPLOAD_PRESET=quarkUpload`

`VITE_API_BASE_URl=https://api.cloudinary.com/v1_1/ddrf0klbu/image/upload`

`VITE_SERVICE_ID=service_xvclb2i`

`VITE_TEMPLATE_ID=template_2b3pntj`

`VITE_PUBLIC_KEY=M9B0ds_Is3kjmQxD0`

