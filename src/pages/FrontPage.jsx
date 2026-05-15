export default function PremiumSplashPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-30-[-120px] w-96 h-96 bg-blue-500/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-37.5 -right-25 w-md h-112 bg-purple-500/30 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* Main Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
          rounded-4xl
          border border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          p-8 sm:p-12
          text-center
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div
            className="
              relative
              w-28 h-28 sm:w-36 sm:h-36
              rounded-4xl
              bg-linear-to-br
              from-blue-500
              to-indigo-600
              flex items-center justify-center
              shadow-[0_0_60px_rgba(59,130,246,0.5)]
              animate-pulse
            "
          >
            {/* Replace this image with your logo */}
           <span className="text-white text-2xl font-bold">
        A
      </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
          Welcome to
          <span className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
            Auth App
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-5 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          Modern authentication experience with premium security,
          lightning-fast access, and beautifully crafted UI.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-blue-300">Secure</h3>
            <p className="text-xs text-gray-400 mt-1">
              JWT + OTP + Google Auth
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300">Modern</h3>
            <p className="text-xs text-gray-400 mt-1">
              Responsive premium UI/UX
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-pink-300">Protected</h3>
            <p className="text-xs text-gray-400 mt-1">
              Device & session security
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-10">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="
              w-full sm:w-auto
              px-10 py-4
              rounded-2xl
              bg-linear-to-r
              from-blue-500
              to-indigo-600
              font-semibold
              text-white
              shadow-xl
              hover:scale-[1.03]
              active:scale-[0.98]
              transition-all
              duration-300
            "
          >
            Get Started
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8">
          Designed for modern authentication experiences.
        </p>
      </div>
    </div>
  );
}
