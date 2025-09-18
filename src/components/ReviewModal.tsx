import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { cn } from '@/lib/utils';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (rating: number, review: string) => void;
  restaurantName?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  restaurantName = 'this restaurant'
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (rating === 0) return;
    
    onSubmit?.(rating, review);
    
    // Reset form
    setRating(0);
    setHoveredRating(0);
    setReview('');
    onClose();
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (selectedRating: number) => {
    setHoveredRating(selectedRating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[439px] p-6 bg-white rounded-2xl border-0 shadow-lg"
        showCloseButton={false}
      >
        {/* Custom Header with Close Button */}
        <div className="flex items-center justify-between mb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-[#0A0D12] font-nunito">
              Give Review
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-[#0A0D12]" strokeWidth={2} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Rating Section */}
          <div className="w-full flex flex-col items-center gap-4">
            <h3 className="text-base font-extrabold text-[#0A0D12] font-nunito">
              Give Rating
            </h3>
            
            {/* Stars */}
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hoveredRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingHover(star)}
                    onMouseLeave={handleRatingLeave}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={cn(
                        "w-12 h-12 transition-colors",
                        isActive
                          ? "fill-[#FDB022] text-[#FDB022]"
                          : "fill-[#A4A7AE] text-[#A4A7AE]"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text Area */}
          <div className="w-full">
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Please share your thoughts about our service!"
              className="w-full min-h-[80px] p-3 border border-[#D5D7DA] rounded-xl resize-none bg-white text-base text-[#0A0D12] placeholder:text-[#717680] focus:outline-none focus:ring-2 focus:ring-[#C12116] focus:border-transparent font-nunito"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-[#C12116] hover:bg-[#C12116]/90 text-white font-bold text-base py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-nunito"
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
