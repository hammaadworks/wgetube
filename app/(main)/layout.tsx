import '../globals.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* You can add a common header, navigation, or footer here for the (main) group */}
        {children}
      </body>
    </html>
  );
}
