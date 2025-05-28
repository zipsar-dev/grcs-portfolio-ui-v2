import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TicketPercent } from 'lucide-react'; // Example Icon

interface OfferTitleCardProps {
  title: string;
  description: string;
  discount?: string;
  validity?: string;
  ctaText?: string;
  ctaLink?: string;
}

const OfferTitleCard: React.FC<OfferTitleCardProps> = ({
  title,
  description,
  discount,
  validity,
  ctaText = "Learn More",
  ctaLink = "#"
}) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden border dark:border-slate-700">
      <CardHeader className="p-6 bg-gradient-to-r from-[#39b54b] to-[#2aa73a] text-white">
        <div className="flex items-center space-x-4">
          <TicketPercent size={36} className="text-white flex-shrink-0" />
          <CardTitle className="text-2xl lg:text-3xl font-extrabold tracking-tight">{title}</CardTitle>
        </div>
        {discount && (
          <p className="mt-3 text-xs font-bold bg-white text-[#39b54b] px-3 py-1 rounded-full inline-block shadow-sm uppercase tracking-wider">
            {discount}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="text-slate-600 dark:text-slate-400 mb-5 text-base leading-relaxed">
          {description}
        </CardDescription>
        {validity && (
          <p className="text-xs text-slate-500 dark:text-slate-500 mb-5 font-medium">
            VALID UNTIL: {validity}
          </p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-2 w-full sm:w-auto bg-[#39b54b] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#2caA3b] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transform hover:scale-105"
          >
            {ctaText}
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default OfferTitleCard;