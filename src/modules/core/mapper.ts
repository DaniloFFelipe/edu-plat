export interface Mapper<F, T> {
  to(t: T): F
  from(t: F): T
}
