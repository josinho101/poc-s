import { NextRequest } from "next/server";
import { deleteProduct, getProduct } from "@/services/productService";
import { accepted, notFound, ok, serverError } from "@/utils/responseHelper";

export const GET = (_: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const product = getProduct(id);
    if (!product) {
      return notFound("Not found");
    }

    return ok(product);
  } catch (e) {
    return serverError(e);
  }
};

export const DELETE = (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const result = deleteProduct(id);
    if (!result) {
      return notFound("Product not found!");
    }

    return accepted();
  } catch (e) {
    return serverError(e);
  }
};
