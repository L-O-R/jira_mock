import React, {
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import gsap from "gsap";
import LoginForm from "../components/Auth/Login";
import SignupForm from "../components/Auth/Signup";

const AuthPage = () => {
  const cardRef = useRef(null);
  const [isLoginVisible, setIsLoginVisible] =
    React.useState(true);

  // Animate flip on state change
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationY: isLoginVisible ? 0 : 180,
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [isLoginVisible]);

  const switchToSignup = () => {
    setIsLoginVisible(false);
  };

  const switchToLogin = () => {
    setIsLoginVisible(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left half: Image container */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random/1920x1080/?abstract')",
        }}>
        {/* Optional: Add text or content here if needed */}
      </div>

      {/* Right half: Forms container with perspective for 3D */}
      <div
        className="relative w-1/2 h-full bg-surface flex items-center justify-center"
        style={{ perspective: 2000 }}>
        {/* Flip card container */}
        <div
          ref={cardRef}
          className="relative w-3/5 h-3/5 border border-gray-600 rounded-lg shadow-lg shadow-primary/40 "
          style={{
            transformStyle: "preserve-3d",
          }}>
          {/* Front side (Login form) */}
          <div
            className="absolute inset-0 bg-surface shadow-xl flex items-center justify-center rounded-lg "
            style={{
              backfaceVisibility: "hidden",
            }}>
            <LoginForm switchToSignup={switchToSignup} />
          </div>

          {/* Back side (Signup form, rotated 180deg initially) */}
          <div
            className="absolute inset-0 bg-surface shadow-xl flex items-center justify-center rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}>
            <SignupForm switchToLogin={switchToLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
