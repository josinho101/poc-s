import { getAllProducts, createProduct } from "@/services/productService";
import { ProductRequest } from "@/models/product";
import { badRequest, created, serverError, ok } from "@/utils/responseHelper";

export const GET = () => {
  try {
    const products = getAllProducts();
    return ok(products);
  } catch (e) {
    return serverError(e);
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const result = ProductRequest.safeParse(data);
    if (!result.success) {
      return badRequest(result.error);
    }
    createProduct(data);
    return created();
  } catch (e) {
    return serverError(e);
  }
};
