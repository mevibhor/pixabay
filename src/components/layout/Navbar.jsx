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

const getDisplayName = (user) => {
  if (user?.displayName?.trim()) {
    return user.displayName.trim();
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return "User";
};

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const Navbar = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn, logOut } = useFirebase();

  const { openLogin, openSignup } = useAuthModal();

  const displayName = getDisplayName(user);
  const initials = getInitials(displayName);

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

      <div className="flex items-center gap-1.5 sm:gap-3">
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

            <div
              className="flex items-center gap-2 px-1.5 py-1.5 sm:px-3 rounded-full border border-white/10 bg-white/10"
              title={user?.email || displayName}
            >
              <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full shrink-0">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xs font-bold text-gray-900">
                    {initials}
                  </span>
                )}
              </div>

              <div className="hidden min-w-0 sm:block">
                <p className="text-[10px] leading-none text-gray-300">
                  Welcome,
                </p>

                <p className="max-w-[130px] mt-1 text-sm font-semibold leading-none text-white truncate">
                  {displayName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogOut}
              className={pillStyle}
              aria-label="Log out"
            >
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
