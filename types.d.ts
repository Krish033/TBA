type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type LoginProps = {
  email: string;
  password: string;
};
