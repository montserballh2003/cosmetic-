import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Header from "../components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-anoohe-bg">
      <Header />
      <main className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-abhaya text-anoohe-dark mb-6">
            الصفحة غير موجودة
          </h2>
          <p className="text-anoohe-gray mb-8 font-abhaya">
            عذراً، لا يمكن العثور على الصفحة التي تبحث عنها.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/">العودة إلى الصفحة الرئيسية</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
