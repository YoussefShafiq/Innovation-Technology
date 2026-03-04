import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const NotFound = () => (
  <section className="min-h-screen flex items-center justify-center bg-background pt-20">
    <Container className="text-center">
      {/* Big 404 */}
      <div className="relative mb-8 inline-block">
        <span className="text-[10rem] sm:text-[14rem] font-display font-extrabold leading-none select-none"
          style={{ WebkitTextStroke: "2px var(--color-primary)", color: "transparent" }}>
          404
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
        Page Not Found
      </h2>
      <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto">
        Looks like this page took a wrong turn. Let's get you back on track.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg" className="group">
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </Button>
      </Link>
    </Container>
  </section>
);

export default NotFound;
