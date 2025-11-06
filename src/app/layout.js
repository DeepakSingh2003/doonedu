import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/Subnav";
import Footer from "./components/footer";
import { ModalProvider } from "./contexts/ModalContext";
import { CityProvider } from "./contexts/CityContext";
import { LoginProvider } from "./contexts/LoginContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Popuplogin from "./components/PopupLogin";
import { ToastContainer } from "react-toastify";
import CallBackPopup from "./components/CallBackPopup";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title:
    "Boarding School in North India |Fee, Review, Admission |Global Edu Consulting",
  description:
    "List of Top Boarding Schools in North India - Find Fees, Reviews, List, Results, Facilities, Admission Information, Admission Dates & Admission Forms, Distance, Location, Videos, Photographs & Academic Results of High Schools, CBSE Schools, ICSE Schools, International Baccalaureate Schools (IB), IGCSE Schools, Boarding schools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-poppins), sans-serif", margin: 0, padding: 0 }}
        cz-shortcut-listen="true"
      >
        <ModalProvider>
          <WishlistProvider>
            <CityProvider>
              <LoginProvider>
                <Navbar />
                <div className="pt-14 sm:pt-16">
                  <SubNavbar />
                </div>
                {children}
                <Popuplogin />
               <CallBackPopup/>
                <ToastContainer />
                <Footer />
                <BottomNav />
              </LoginProvider>
            </CityProvider>
          </WishlistProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
