import { createPricingPackage } from "../actions";
import PricingForm from "../PricingForm";

export default function NewPricingPackagePage() {
    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">New Pricing Package</h1>
            <PricingForm action={createPricingPackage} />
        </div>
    );
}