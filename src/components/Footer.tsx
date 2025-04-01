export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p>&copy; {currentYear} My Blog. All rights reserved.</p>
        {/* Add social links or other info here if needed */}
      </div>
    </footer>
  );
}
