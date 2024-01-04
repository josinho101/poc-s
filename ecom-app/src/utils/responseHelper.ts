import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export const ok = (data: any) => {
  return NextResponse.json(data, { status: StatusCodes.OK });
};

export const created = () => {
  return NextResponse.json({}, { status: StatusCodes.CREATED });
};

export const badRequest = (data: any) => {
  return NextResponse.json(data, { status: StatusCodes.BAD_REQUEST });
};

export const notFound = (data: any) => {
  return NextResponse.json(data, { status: StatusCodes.NOT_FOUND });
};

export const accepted = () => {
  return NextResponse.json({}, { status: StatusCodes.ACCEPTED });
};

export const serverError = (e: any) => {
  const message = (e as Error).message;
  return NextResponse.json(message, {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};
