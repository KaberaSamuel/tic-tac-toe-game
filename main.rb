puts "\n"

class Player
  @@playing = true
  @@array = [1,2,3,4,5,6,7,8,9]

  attr_accessor :name, :char, :three_in_row

  def self.is_playing?
    @@playing
  end

  def initialize(n, c)
    self.name = n
    self.char = c
  end

  def draw(number = 0)
    counter = 0
    @@array.each_with_index do |item, index| 
      counter += 1
      if item == number
        print "  #{char}"
        @@array[index] = char
      else
        print "  #{item}"
      end
      puts "" if counter % 3 == 0
    end
    puts "------------------------\n\n"

    if ( 
      (@@array[0] == char && @@array[1] == char && @@array[2] == char) ||
      (@@array[3] == char && @@array[4] == char && @@array[5] == char) ||
      (@@array[6] == char && @@array[7] == char && @@array[8] == char) || 
      (@@array[0] == char && @@array[3] == char && @@array[6] == char) ||
      (@@array[1] == char && @@array[4] == char && @@array[7] == char) ||
      (@@array[2] == char && @@array[5] == char && @@array[8] == char)
       )
        @@playing = false
    end
  end
end

player_X = Player.new('Player_x', 'X')
player_O = Player.new('Player_0', 'O')
players = [player_X, player_O]
active_index = 1
player_O.draw

while Player.is_playing?
  active_index = active_index == 1 ? 0 : 1
  puts "#{players[active_index].name}'s turn"
  puts 'Enter your position:'
  user_input = gets.chomp
  puts ''
  players[active_index].draw(user_input.to_i)
end

puts "GAME OVER: The winner is #{players[active_index].name}"

puts "\n"