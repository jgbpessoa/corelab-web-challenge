import React, { useState, ChangeEvent } from "react";
import { TermsInterface } from "../../types/TermsInterface";

interface FilterFormInterface {
  filterValues: {
    brandFilters: string[];
    colorFilters: string[];
    yearFilters: number[];
  };
  searchTerms: TermsInterface;
  setSearchTerms: React.Dispatch<React.SetStateAction<any>>;
}

function FilterForm({
  filterValues,
  searchTerms,
  setSearchTerms,
}: FilterFormInterface) {
  const handleChange = (event: ChangeEvent) => {
    if (event.target.id === "brand" || event.target.id === "color") {
      setSearchTerms({
        ...searchTerms,
        [(event.target as HTMLInputElement).id]: (
          event.target as HTMLInputElement
        ).value,
      });
    } else {
      const value =
        (event.target as HTMLInputElement).value === ""
          ? ""
          : +(event.target as HTMLInputElement).value;
      setSearchTerms({
        ...searchTerms,
        [(event.target as HTMLInputElement).id]: value,
      });
    }
  };

  return (
    <>
      <section className="form">
        <h2>Filter Search</h2>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <select
            name="brand"
            id="brand"
            value={searchTerms.brand}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {filterValues.brandFilters.map((brandFilter) => (
              <option key={Math.random()} value={brandFilter}>
                {brandFilter}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <select
            name="color"
            id="color"
            value={searchTerms.color}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {filterValues.colorFilters.map((colorFilter) => (
              <option key={Math.random()} value={colorFilter}>
                {colorFilter}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            value={searchTerms.year}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {filterValues.yearFilters.map((yearFilter) => (
              <option key={Math.random()} value={yearFilter}>
                {yearFilter}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">Min Price</label>
          <input
            name="min_price"
            id="min_price"
            type="number"
            className="form-control"
            value={searchTerms.min_price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Max Price</label>
          <input
            name="max_price"
            id="max_price"
            type="number"
            className="form-control"
            value={searchTerms.max_price}
            onChange={handleChange}
            required
          />
        </div>
      </section>
    </>
  );
}

export default FilterForm;
