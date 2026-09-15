import { ServiceForm } from "../ServiceForm";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-pure">Create Service</h1>
        <p className="text-xs text-text-off-white/60 mt-1">
          Add a new engineering solution or service offering to the website.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
