FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Install Xvfb
RUN apt-get update && apt-get install -y xvfb

# Define workspace
WORKDIR /app

# Copy file
COPY package.json package-lock.json* ./

# Install Dependencies
RUN npm install --frozen-lockfile

# Copy all files
COPY . .

# Run the script
CMD ["sh", "-c", "xvfb-run -a npx playwright test src/tests/LoginTest.spec.ts --project=chromium"]
