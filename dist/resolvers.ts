// use merge to merge all resolver objects
import { merge } from 'lodash';

import globalResolvers from './resolvers';

// merge all resolver objects and export the result
export default merge(
    globalResolvers
);