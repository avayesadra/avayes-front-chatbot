import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import "../styles/globals.css";
import "../styles/scss/style.scss"; // Import your global SCSS file
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";

export const metadata = {
  title: "چت بات آوایس",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <ModalProvider>
            <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
              <HeaderComponent />

              {children}

              <ToastContainer rtl theme={"colored"} />

              <FooterComponent />
            </main>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
