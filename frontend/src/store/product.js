import { create } from "zustand"

const productsApiEndpoint = "/api/products"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields!" }
    }
    const res = await fetch(productsApiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
    const fetchedProducts = await res.json()
    set((state) => ({ products: [...state.products, fetchedProducts.data] }))
    return { success: true, message: "Product created successfully!" }
  },
  fetchProducts: async () => {
    const res = await fetch(productsApiEndpoint)
    const products = await res.json()
    set({ products: products.data })
  },
  deleteProduct: async (id) => {
    const res = await fetch(`${productsApiEndpoint}/${id}`, {
      method: "DELETE",
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }))
    return { success: true, message: data.message }
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`${productsApiEndpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
    const data = await res.json()
    if (!data.success)
      return {
        success: false,
        message: data.message,
      }
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }))
    return { success: true, message: "Product updated successfully!" }
  },
}))
