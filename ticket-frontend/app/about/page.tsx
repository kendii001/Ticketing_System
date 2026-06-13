import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
export default function About() {
  return (
    <div>
      <Navbar/>
      <h1>About Us</h1>
      <GoogleAnalytics />
      <p>Welcome to our About page.</p>
<Footer/>
    </div>
  );
}