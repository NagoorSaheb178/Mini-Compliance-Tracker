import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mini Compliance Tracker',
  description: 'Compliance task tracker for LedgersCFO',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-between items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight">LedgersCFO Tracker</h1>
            <nav className="flex gap-4 sm:gap-6">
              <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">Dashboard</a>
              <a href="/clients" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">Clients</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} LedgersCFO Mini Tracker
          </div>
        </footer>
      </body>
    </html>
  );
}
