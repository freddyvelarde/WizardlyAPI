interface BodyRequest {
  name: string | "";
  description: string | "";
  method: string;
  url: string;
  headers: string;
  body: string;
}

export default BodyRequest;
