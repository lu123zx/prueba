export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 bg-ink px-6 py-8 text-white sm:flex-row lg:px-20">
      <p className="text-[15px] font-semibold">nube9</p>
      <p className="text-[13px] text-ink-soft">
        © {new Date().getFullYear()} Nube 9. Santiago, Chile.
      </p>
    </footer>
  );
}
