export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <p className="text-lg font-light tracking-[0.25em] text-gray-900 mb-2">COSMETIC</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              자연에서 온 성분, 과학이 완성한 케어
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-8">© 2024 COSMETIC. All rights reserved.</p>
      </div>
    </footer>
  );
}
