import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Mail, Share2 } from 'lucide-react'; // Using Linkedin instead of Pinterest as it's more professional

const ShareButtons = () => {
  const shareButtons = [
    { icon: <Facebook className="h-5 w-5" />, label: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: <Twitter className="h-5 w-5" />, label: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600' },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800' },
    { icon: <Mail className="h-5 w-5" />, label: 'Email', color: 'bg-gray-500 hover:bg-gray-600' },
    { icon: <Share2 className="h-5 w-5" />, label: 'Share', color: 'bg-green-500 hover:bg-green-600' },
  ];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col space-y-1 bg-white p-1 rounded-r-md shadow-lg">
        {shareButtons.map((button) => (
          <Button
            key={button.label}
            variant="default"
            size="icon"
            className={`${button.color} text-white w-10 h-10`}
            aria-label={`Share on ${button.label}`}
          >
            {button.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;