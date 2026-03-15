import { Metadata } from "next";
import { IndianRupee, TrendingUp, Repeat, Info } from "lucide-react";
import { getAllPricing } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AdBanner } from "@/components/ads/AdBanner";

export const metadata: Metadata = {
  title: "Pricing Guide - What Pet Services Cost in Pune",
  description: "Transparent pricing for pet services in East Pune. Compare budget, mid-range & premium costs for vets, grooming, boarding, training, walking & transport.",
};

export default function PricingPage() {
  const pricing = getAllPricing();

  const services = [...new Set(pricing.map((p) => p.service))];

  const tierColors = {
    budget: "bg-green-50 border-green-200 text-green-800",
    mid: "bg-blue-50 border-blue-200 text-blue-800",
    premium: "bg-purple-50 border-purple-200 text-purple-800",
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-bluey-ice to-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bluey-navy tracking-tight">
            Pricing Guide
          </h1>
          <p className="mt-3 text-lg text-bluey-navy/50 max-w-xl">
            Transparent pricing for every pet service in East Pune. Know what to
            expect before you book.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge className="!text-sm !px-3 !py-1 bg-green-50 text-green-800 border-green-200">Budget</Badge>
            <Badge className="!text-sm !px-3 !py-1 bg-blue-50 text-blue-800 border-blue-200">Mid-Range</Badge>
            <Badge className="!text-sm !px-3 !py-1 bg-purple-50 text-purple-800 border-purple-200">Premium</Badge>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10">
          {services.map((service) => {
            const items = pricing.filter((p) => p.service === service);
            return (
              <div key={service}>
                <h2 className="text-2xl font-bold text-bluey-navy mb-4 flex items-center gap-2">
                  <IndianRupee className="w-6 h-6 text-bluey-primary" />
                  {service}
                </h2>
                <div className="bg-white rounded-2xl border border-bluey-pale/60 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-bluey-ice/40">
                          <th className="text-left px-5 py-3 font-bold text-bluey-navy">
                            Service
                          </th>
                          <th className="text-left px-5 py-3 font-bold text-green-700">
                            Budget
                          </th>
                          <th className="text-left px-5 py-3 font-bold text-blue-700">
                            Mid
                          </th>
                          <th className="text-left px-5 py-3 font-bold text-purple-700">
                            Premium
                          </th>
                          <th className="text-left px-5 py-3 font-bold text-bluey-navy/50">
                            Frequency
                          </th>
                          <th className="text-left px-5 py-3 font-bold text-bluey-navy/50">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bluey-pale/40">
                        {items.map((item, i) => (
                          <tr
                            key={i}
                            className="hover:bg-bluey-ice/20 transition-colors"
                          >
                            <td className="px-5 py-3 font-medium text-bluey-navy">
                              {item.subService}
                            </td>
                            <td className="px-5 py-3">
                              <span className="inline-block bg-green-50 text-green-800 px-2 py-0.5 rounded-md text-xs font-semibold">
                                {item.budget}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <span className="inline-block bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md text-xs font-semibold">
                                {item.mid}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <span className="inline-block bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md text-xs font-semibold">
                                {item.premium}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1 text-xs text-bluey-navy/50">
                                <Repeat className="w-3 h-3" />
                                {item.repeatFreq}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-xs text-bluey-navy/40 max-w-[200px]">
                              {item.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <AdBanner className="mt-10" />

        <div className="mt-10 bg-bluey-ice/30 rounded-2xl p-6 border border-bluey-pale/40">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-bluey-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-bluey-navy text-sm">About these prices</p>
              <p className="text-sm text-bluey-navy/50 mt-1 leading-relaxed">
                Prices are based on our research across providers in East Pune as of
                March 2026. Actual prices may vary based on pet size, breed, condition,
                and specific requirements. Emergency and after-hours services may carry
                additional surcharges. Always confirm pricing directly with the provider
                before booking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
