import { Metadata } from "next";
import { IndianRupee, Repeat, Info } from "lucide-react";
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

  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-bluey-gold font-medium mb-4">Transparency</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
            Pricing Guide
          </h1>
          <p className="mt-3 text-white/40 text-sm max-w-xl">
            Transparent pricing for every pet service in East Pune. Know what to
            expect before you book.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge className="!text-[10px] !tracking-wider !uppercase bg-green-50 text-green-700 border-green-200/60">Budget</Badge>
            <Badge className="!text-[10px] !tracking-wider !uppercase bg-blue-50 text-blue-700 border-blue-200/60">Mid-Range</Badge>
            <Badge className="!text-[10px] !tracking-wider !uppercase bg-purple-50 text-purple-700 border-purple-200/60">Premium</Badge>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {services.map((service) => {
            const items = pricing.filter((p) => p.service === service);
            return (
              <div key={service}>
                <h2 className="font-display text-xl font-semibold text-bluey-navy mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-bluey-gold" aria-hidden="true" />
                  {service}
                </h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-bluey-pale/40">
                          <th scope="col" className="text-left px-5 py-3.5 text-[10px] uppercase tracking-wider font-medium text-bluey-navy/40">
                            Service
                          </th>
                          <th scope="col" className="text-left px-5 py-3.5 text-[10px] uppercase tracking-wider font-medium text-green-600">
                            Budget
                          </th>
                          <th scope="col" className="text-left px-5 py-3.5 text-[10px] uppercase tracking-wider font-medium text-blue-600">
                            Mid
                          </th>
                          <th scope="col" className="text-left px-5 py-3.5 text-[10px] uppercase tracking-wider font-medium text-purple-600">
                            Premium
                          </th>
                          <th scope="col" className="text-left px-5 py-3.5 text-[10px] uppercase tracking-wider font-medium text-bluey-navy/30">
                            Frequency
                          </th>
                          <th scope="col" className="text-left px-5 py-3.5 text-[10px] uppercase tracking-wider font-medium text-bluey-navy/30">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bluey-pale/30">
                        {items.map((item, i) => (
                          <tr
                            key={i}
                            className="hover:bg-bluey-ice/30 transition-colors"
                          >
                            <td className="px-5 py-3.5 font-medium text-bluey-navy text-sm">
                              {item.subService}
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-xs text-green-700 font-medium">
                                {item.budget}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-xs text-blue-700 font-medium">
                                {item.mid}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-xs text-purple-700 font-medium">
                                {item.premium}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-1 text-xs text-bluey-navy/30">
                                <Repeat className="w-3 h-3" aria-hidden="true" />
                                {item.repeatFreq}
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-xs text-bluey-navy/30 max-w-[200px]">
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

        <AdBanner className="mt-12" />

        <div className="mt-12 bg-bluey-ice rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-bluey-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-bluey-navy text-sm">About these prices</p>
              <p className="text-sm text-bluey-navy/40 mt-1 leading-relaxed">
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
