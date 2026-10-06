import { Link, useNavigate } from "react-router-dom";
import { Download, Heart, LogOut } from "lucide-react";
import { toast } from "sonner";

import pixabayLogo from "../../assets/logo.svg";
import { useFirebase } from "../../context/Firebase";
import { useAuthModal } from "../../context/ModalContext";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80";

const linkStyle = `
  flex items-center gap-1.5 rounded-full px-3 py-1.5
  text-sm font-medium text-white
  transition-all duration-300
  hover:bg-white/15 hover:scale-105
  active:scale-95
  ${focusRing}
`;

const pillStyle = `
  flex items-center gap-1.5 rounded-full
  border border-white/70 bg-white/10
  px-4 py-1.5 text-sm font-semibold text-white
  transition-all duration-300
  hover:bg-white hover:text-gray-900
  hover:scale-105
  active:scale-95
  ${focusRing}
`;

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, logOut } = useFirebase();

  const { openLogin, openSignup } = useAuthModal();

  const handleLogOut = async () => {
    try {
      await logOut();

      toast.success("You have been logged out successfully.");

      navigate("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  return (
    <nav className="relative z-10 flex items-center justify-between w-full px-4 py-4 text-white sm:px-6 lg:px-8">
      <Link to="/" className={`shrink-0 rounded ${focusRing}`}>
        <img
          src={pixabayLogo}
          alt="Pixabay"
          className="w-24 transition-opacity duration-300 sm:w-28 lg:w-32 hover:opacity-80"
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        {isLoggedIn ? (
          <>
            <Link to="/favourites" className={linkStyle}>
              <Heart size={18} />

              <span className="hidden md:inline">Favourites</span>
            </Link>

            <Link to="/downloads" className={linkStyle}>
              <Download size={18} />

              <span className="hidden md:inline">Downloads</span>
            </Link>

            <button type="button" onClick={handleLogOut} className={pillStyle}>
              <LogOut size={16} />

              <span className="hidden sm:inline">Log out</span>
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={openLogin} className={linkStyle}>
              Log in
            </button>

            <button type="button" onClick={openSignup} className={pillStyle}>
              Join
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
