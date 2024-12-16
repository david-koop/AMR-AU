FROM mcr.microsoft.com/playwright:v1.48.2-focal

# התקנת Xvfb
RUN apt-get update && apt-get install -y xvfb

# הגדרת סביבת עבודה
WORKDIR /app

# העתקת הקבצים
COPY package.json package-lock.json* ./

# התקנת חבילות
RUN npm install --frozen-lockfile

# העתקת יתר הקבצים
COPY . .

# הרצת Xvfb והפעלה של הבדיקות
CMD ["sh", "-c", "xvfb-run -a npx playwright test src/tests/LoginTest.spec.ts --project=chromium"]
