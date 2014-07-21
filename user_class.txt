class User < ActiveRecord::Base
  validates :first_name,  format: { with: /\A[a-zA-Z]+\z/,
                                    message: "only allows letters" }
  validates :last_name,  format: { with: /\A[a-zA-Z]+\z/,
                                   message: "only allows letters" }
  validates :email,  format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/,
                                   message: "is not valid" }
  validates :first_name,  presence: true
  validates :last_name,  presence: true
  validates :email,  presence: true

end
