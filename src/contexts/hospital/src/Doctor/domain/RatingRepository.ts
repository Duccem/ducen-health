import { Uuid } from 'core';
import { Rating } from './Rating';

export interface RatingRepository {
  save(rating: Rating): Promise<void>;
  findDoctorRatings(doctorId: Uuid): Promise<Rating[]>;
}
