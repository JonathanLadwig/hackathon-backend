export interface Root {
    search_metadata: SearchMetadata
    search_parameters: SearchParameters
    search_information: SearchInformation
    filters: Filter[]
    inline_shopping_results: InlineShoppingResult[]
    shopping_results: ShoppingResult[]
    categories: Category[]
    featured_shopping_results: FeaturedShoppingResult[]
    pagination: Pagination
    serpapi_pagination: SerpapiPagination
  }
  
  export interface SearchMetadata {
    id: string
    status: string
    json_endpoint: string
    created_at: string
    processed_at: string
    google_shopping_url: string
    raw_html_file: string
    total_time_taken: number
  }
  
  export interface SearchParameters {
    engine: string
    q: string
    location_requested: string
    location_used: string
    google_domain: string
    hl: string
    gl: string
    device: string
  }
  
  export interface SearchInformation {
    shopping_results_state: string
    query_displayed: string
    location_detected: string
  }
  
  export interface Filter {
    type: string
    options: Option[]
  }
  
  export interface Option {
    text: string
    tbs: string
  }
  
  export interface InlineShoppingResult {
    position: number
    block_position: string
    title: string
    price: string
    extracted_price: number
    link: string
    source: string
    thumbnail: string
    rating?: number
    reviews?: number
  }
  
  export interface ShoppingResult {
    position: number
    title: string
    link: string
    product_link: string
    product_id: string
    serpapi_product_api: string
    source: string
    price: string
    extracted_price: number
    rating?: number
    reviews?: number
    extensions: string[]
    thumbnail: string
    delivery: string
    number_of_comparisons?: string
    comparison_link?: string
    serpapi_product_api_comparisons?: string
    alternative_price?: AlternativePrice
    old_price?: string
    extracted_old_price?: number
    tag?: string
    second_hand_condition?: string
  }
  
  export interface AlternativePrice {
    price: string
    extracted_price: number
    currency: string
  }
  
  export interface Category {
    title: string
    filters: Filter2[]
  }
  
  export interface Filter2 {
    title: string
    thumbnail: string
    link: string
    serpapi_link: string
  }
  
  export interface FeaturedShoppingResult {
    position: number
    title: string
    link: string
    product_link: string
    product_id: string
    serpapi_product_api: string
    number_of_comparisons?: string
    comparison_link?: string
    serpapi_product_api_comparisons?: string
    source: string
    price: string
    extracted_price: number
    alternative_price?: AlternativePrice2
    rating: number
    reviews: number
    extensions: string[]
    thumbnail: string
    delivery: string
    remark: string
    second_hand_condition?: string
  }
  
  export interface AlternativePrice2 {
    price: string
    extracted_price: number
    currency: string
  }
  
  export interface Pagination {
    current: number
    next: string
    other_pages: OtherPages
  }
  
  export interface OtherPages {
    "2": string
    "3": string
    "4": string
    "5": string
    "6": string
    "7": string
    "8": string
  }
  
  export interface SerpapiPagination {
    current: number
    next_link: string
    next: string
    other_pages: OtherPages2
  }
  
  export interface OtherPages2 {
    "2": string
    "3": string
    "4": string
    "5": string
    "6": string
    "7": string
    "8": string
  }