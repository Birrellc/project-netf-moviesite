import { Product } from '@stripe/firestore-stripe-payments';
import React from 'react';

interface Props {
  products: Product[];
  activePlan: Product | null;
}

const Table = ({ products, activePlan }: Props) => {
  return (
    <table>
      <tbody className='divide-y divide-[gray]'>
        <tr>
          {/* map through the products and add the price for each plan */}
          {products.map((product) => (
            //access price / 100 to set 0.00 format - ! because object is possibly null
            <td
              className={`tableData ${
                activePlan?.id === product.id ? 'text-[#fff]' : 'text-[grey]'
              }`}
              key={product.id}
            >
              £{product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>

        <tr>
          {products.map((product) => (
            <td
              className={`tableData ${
                activePlan?.id === product.id ? 'text-[#fff]' : 'text-[grey]'
              }`}
              key={product.id}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr>
          {products.map((product) => (
            <td
              className={`tableData ${
                activePlan?.id === product.id ? 'text-[#fff]' : 'text-[grey]'
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
