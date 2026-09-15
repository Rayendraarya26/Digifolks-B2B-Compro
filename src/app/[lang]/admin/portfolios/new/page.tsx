import { PortfolioForm } from "../PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-pure">Create Portfolio</h1>
        <p className="text-xs text-text-off-white/60 mt-1">
          Add a new client case study or showcase project to the website.
        </p>
      </div>

      <PortfolioForm />
    </div>
  );
}
