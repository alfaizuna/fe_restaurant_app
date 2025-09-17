import { useState } from 'react'
import { Input } from '@/shared/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { debounce } from '@/shared/utils'

interface RestaurantFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onPriceChange: (price: string) => void
}

export function RestaurantFilters({
  onSearchChange,
  onCategoryChange,
  onPriceChange,
}: RestaurantFiltersProps) {
  const [search, setSearch] = useState('')

  const debouncedSearch = debounce((value: string) => {
    onSearchChange(value)
  }, 300)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fast-food">Fast Food</SelectItem>
            <SelectItem value="italian">Italian</SelectItem>
            <SelectItem value="asian">Asian</SelectItem>
            <SelectItem value="mexican">Mexican</SelectItem>
            <SelectItem value="pizza">Pizza</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onPriceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">$ (Budget)</SelectItem>
            <SelectItem value="medium">$$ (Moderate)</SelectItem>
            <SelectItem value="high">$$$ (Expensive)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
