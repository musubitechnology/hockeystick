import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is flex?",
      answer: `Flex is measured by the number of pounds required to bend the stick 1". 

Standardized Testing Method:
The stick is placed on a testing machine where the ends are securely supported. A weight or force is applied to the center of the stick, and the amount of deflection (bend) is measured.

For example, a stick with a 75 flex requires 75 pounds of force to bend the shaft one inch.`
    },
    {
      question: "What is the blade curve?",
      answer: `The blade has three parts: the heel (closest to the shaft), the mid and the toe (the tip of the blade). Depending on where the curve takes place, you'll have different strengths:

• Mid-curves are great all around sticks (like the P92 / 29)
• Toe-curves are the new thing. They allow a lot more puck control but require lots of practice to unlock the potential of that stick
• Heel-curves are considered by some to be "old-school" but many pros still love them. They are great for defenders with powerful shots`
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
            <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};