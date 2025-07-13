# 📍 Raintor Frontend Assessment — Real-Time Location & User Feed

This project was built for the Frontend Developer technical assessment at **Raintor Ltd.** It demonstrates real-time location sharing using SignalR and infinite scrolling for a paginated user feed using Next.js.

## 🚀 Live Demo

🔗 [Live App on Vercel](https://technical-assessment-raintor-2.vercel.app)
📦 [GitHub Repository](https://github.com/NajibHossain49/technical_assessment_raintor_2)

---

## 🛠 Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Styling**: Tailwind CSS
* **API Handling**: React Query
* **WebSocket**: SignalR + Custom `useSignalR` Hook
* **Maps**: Leaflet.js
* **Virtualization**: react-window
* **Others**: Axios

---

## 🔧 Setup Instructions

```bash
git clone https://github.com/NajibHossain49/technical_assessment_raintor_2.git
cd technical_assessment_raintor_2
npm install
npm run dev
```

* Ensure `.env.local` is configured if needed.
* Works out-of-the-box using public SignalR and API endpoints.

---

## ✅ Features

### 1. Real-Time Location Sharing (SignalR)

* User A sends live GPS coordinates
* User B receives and displays them on a Leaflet map
* Encapsulated via a custom `useSignalR` hook

### 2. Infinite Scroll User Feed

* Fetches user list from paginated API
* Implements `react-window` for performance
* Uses React Query for data handling
* Includes loading skeletons, error fallback, and accessibility

---

## 🧑‍💻 Author

Developed with ❤️ by **Najib Hossain**  
[GitHub](https://github.com/NajibHossain49) | [LinkedIn](https://www.linkedin.com/in/md-najib-hossain)



---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

*This project demonstrates advanced frontend development skills including responsive design, accessibility, performance optimization, and modern React patterns.*


