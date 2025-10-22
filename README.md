# 🗺️ Vaxx Map — Interactive Flu Vaccine Coverage Dashboard

**Vaxx Map** is a simple, interactive React + TypeScript dashboard that visualizes flu vaccination coverage across French departments.  
Users can select a **department**, **year**, and **target vaccination rate**, and receive **visual feedback** on current and predicted coverage.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Joseph-Martre/vaxx-map.git
cd vaxx-map
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the project in development mode
```bash
npm run dev
```
Then open the provided local URL (usually `http://localhost:5173`) in your browser.

### 4. Build for production
```bash
npm run build
```
The built files will appear in the `dist/` directory.

---

## 📊 Data Overview

The app uses one main JSON dataset:

**Vaccination Coverage Map** — maps department codes to yearly coverage data:
```json
{
  "30": {
    "2020": 49,
    "2021": 45,
    "2022": 49,
    "2023": 46,
    "2024": 46,
    "nextYearLinearExtrapolation": 45,
  }
}
```

Each department’s **next-year prediction** is computed using **simple linear extrapolation** based on previous years’ values.  
> 💡 This is *not* a machine learning or AI-based model — just straightforward statistical projection.

---

## 🧠 Project Description

- Built with **React**, **TypeScript**, and **Vite**.  
- Features an interactive **SVG map of France**.
- Allows users to:
  - Select a **department**
  - Choose a **year**
  - Define a **target vaccination rate**
  - View corresponding visual feedback directly on the map.

---

## 🗺️ Map Attribution

This project includes a modified version of an SVG map of French departments from:

**Régis Enguehard** — [carte-france-svg](https://github.com/regisenguehard/carte-france-svg)  
Licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**  
[http://creativecommons.org/licenses/by/4.0/](http://creativecommons.org/licenses/by/4.0/)

Modifications include adaptation for web integration and data mapping in React.

When distributing or publishing this project, please retain this attribution in source files or in an `ATTRIBUTIONS.md` / `LICENSES` file as required by CC BY 4.0.

---

## 👥 Collaborators

- **Hugo Fougeret**  
- **Joseph Martre**  
- **Fares Mansour**  
- **Juliette Brisard**

---

## ⚖️ License

This project’s code is released under the **ISC License**.  
The French department SVG map remains under **CC BY 4.0** as per the original author’s license.

---

## 🧩 Tech Stack

- React + TypeScript  
- Vite  
- Vanilla CSS
