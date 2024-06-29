import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import "../styles/globals.css";
import "../styles/scss/style.scss"; // Import your global SCSS file

export const metadata = {
  title: "آوایس",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
          <HeaderComponent />

          {children}

          <FooterComponent />
        </main>
      </body>
    </html>
  );
}
