const StarRating = ({ rating }) => {
  if (rating === undefined) {
    rating = 0;
  }
  const totalStars = 5;
  const decimalPart = rating % 1;
  const filledStars = decimalPart >= 0.8 ? Math.ceil(rating) : Math.fround(rating);

  const hasHalfStar = decimalPart >= 0.3 && decimalPart < 0.8;
  const emptyStars = totalStars - filledStars;


  return (
    <div className="star-ratings">
      <div
        className="star-ratings-fill"
        style={{ width: `${filledStars / totalStars * 100}%` }}
      >
        {Array.from({ length: filledStars }, (_, i) => (
          <span key={`filled-${i}`}>&#9733;</span>
        ))}
                      {hasHalfStar && <span >&#9733;&#xFE0E;</span>}

      </div>
      
      
        <div className="star-ratings-empty">
        {Array.from({ length: emptyStars }, (_, i) => (
          <span  key={`empty-${i}`}>&#9733;</span>
        ))}
      </div>
        
    </div>
  );
};

export default StarRating;
