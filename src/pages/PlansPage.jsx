import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'Perfect for individuals getting started',
    color: 'border-lingua-border',
    badge: null,
    features: [
      '500,000 characters / month',
      'Text translation',
      '3 file translations / month',
      'English ↔ Amharic + 5 languages',
      'Basic API access (10K calls/mo)',
      'Email support',
    ],
    cta: 'Get started free',
    ctaClass: 'btn-secondary border border-lingua-border w-full py-3 rounded-xl text-center',
  },
  {
    name: 'Pro',
    price: { monthly: 29, annual: 23 },
    desc: 'For professionals and growing teams',
    color: 'border-lingua-blue/60',
    badge: 'Most popular',
    badgeColor: 'bg-lingua-blue/20 text-lingua-blue-light border border-lingua-blue/30',
    features: [
      '5,000,000 characters / month',
      'Text, file & voice translation',
      'Unlimited file translations',
      '100+ languages supported',
      'Full API access (500K calls/mo)',
      'Glossary & terminology management',
      'Translation history (1 year)',
      'Priority email & chat support',
    ],
    cta: 'Start free trial',
    ctaClass: 'btn-primary w-full py-3 text-center shadow-lg shadow-lingua-blue/20',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    desc: 'For organizations with advanced needs',
    color: 'border-purple-500/40',
    badge: 'Custom',
    badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    features: [
      'Unlimited characters',
      'All translation types',
      'Unlimited file translations',
      '100+ languages + custom models',
      'Unlimited API access',
      'Custom glossary & workflows',
      'SSO / SAML authentication',
      'SLA + dedicated account manager',
      'On-premise deployment option',
      'SOC 2 compliance reports',
    ],
    cta: 'Contact sales',
    ctaClass: 'w-full py-3 rounded-xl border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-semibold text-sm transition-all text-center',
  },
]

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const faqs = [
  { q: 'Can I change my plan later?', a: 'Yes, you can upgrade, downgrade, or cancel at any time from your account settings. Changes take effect immediately.' },
  { q: 'Is there a free trial for Pro?', a: 'Absolutely. You get a 14-day free trial of the Pro plan, no credit card required.' },
  { q: 'What payment methods are accepted?', a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.' },
  { q: 'Does LinguaAI support Amharic natively?', a: 'Yes — Amharic (አማርኛ) is a first-class language on LinguaAI with dedicated model training for Ge\'ez script.' },
]

export default function PlansPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-lingua-border/40 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lingua-blue/20 to-lingua-purple/20 border border-lingua-blue/20 flex items-center justify-center text-lingua-blue-light">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          </div>
          <div>
            <h1 className="text-lingua-text font-bold text-lg">Plans & Pricing</h1>
            <p className="text-lingua-muted text-xs">Simple, transparent pricing for every team size</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Toggle */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${!annual ? 'text-lingua-text' : 'text-lingua-muted'}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-lingua-blue' : 'bg-lingua-surface border border-lingua-border'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${annual ? 'left-7' : 'left-1'}`} />
              </button>
              <span className={`text-sm font-medium ${annual ? 'text-lingua-text' : 'text-lingua-muted'}`}>
                Annual
                <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-green-500/15 text-green-400 text-xs border border-green-500/20">Save 20%</span>
              </span>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 bg-lingua-card transition-all hover:shadow-xl hover:shadow-black/20 ${plan.color} ${plan.name === 'Pro' ? 'shadow-xl shadow-lingua-blue/10' : ''}`}
              >
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                )}

                <div className="mb-5">
                  <h2 className="text-lingua-text font-bold text-lg mb-1">{plan.name}</h2>
                  <p className="text-lingua-muted text-xs mb-4">{plan.desc}</p>
                  {plan.price.monthly !== null ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-lingua-text">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-lingua-muted text-sm mb-1">/mo</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-lingua-text">Custom</div>
                  )}
                  {annual && plan.price.monthly > 0 && (
                    <p className="text-green-400 text-xs mt-1">Billed annually · Save ${((plan.price.monthly - plan.price.annual) * 12).toFixed(0)}/yr</p>
                  )}
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-lingua-subtext text-xs">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={plan.ctaClass}>{plan.cta}</button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lingua-text font-bold text-xl text-center mb-6">Frequently asked questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-lingua-text text-sm font-medium">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-lingua-muted flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    ><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-lingua-muted text-sm leading-relaxed border-t border-lingua-border/30 pt-3 tab-content">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
