import { Button } from "@/shared/ui/button"

interface QuantityControlProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  className?: string
}

export function QuantityControl({ quantity, onIncrease, onDecrease, className = "" }: QuantityControlProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={onDecrease}
        className="h-8 w-8 p-2 rounded-full border-gray-300 hover:bg-gray-50"
      >
        <img 
          src="/figmaAssets/minus-icon.svg" 
          alt="Decrease" 
          className="w-4 h-4"
        />
      </Button>
      
      <span className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
        {quantity}
      </span>
      
      <Button
        onClick={onIncrease}
        className="h-8 w-8 p-2 rounded-full bg-red-600 hover:bg-red-700"
      >
        <img 
          src="/figmaAssets/add-icon.svg" 
          alt="Increase" 
          className="w-4 h-4"
        />
      </Button>
    </div>
  )
}
