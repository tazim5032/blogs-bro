import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };

    const excluedes = ['search', 'sortBy', 'sortOrder'];
    excluedes.forEach((el) => delete queryObject[el]);

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
  sortOrder() {
    const validSortOrder = this?.query?.sortOrder === 'desc' ? -1 : 1;
    this.modelQuery = this.modelQuery.sort({ createdAt: validSortOrder });

    return this;
  }
}

export default QueryBuilder;
